import io
import re
import hashlib
from base64 import b64encode
from os import listdir, makedirs
from os.path import join, isfile, exists
from shutil import copyfile
from pprint import pprint

fin = open("src/cpuid.html", mode="r", encoding="utf-8")
contents = fin.read()
fin.close()

contents = contents.replace(r'data-build-crossorigin="true"', r'crossorigin="true"');

targetFiles = re.findall(r'data-build-sri="([^"]+)"', contents)
pprint(targetFiles)

for targetFile in targetFiles:
    h = hashlib.sha256()
    fhash = open(join("src/", targetFile), 'rb')
    h.update(fhash.read())
    fhash.close()
    hash = b64encode(h.digest()).decode('utf-8')
    print(targetFile + " = " + hash)
    contents = contents.replace(r'data-build-sri="' + targetFile + '"', 'integrity="sha256-' + hash + '"')

if not exists("build/"):
    makedirs("build/")

fout = open("build/index.html", mode="w", encoding="utf-8")
fout.write(contents)
fout.close()


files = [f for f in listdir("src/") if (isfile(join("src/", f)) and not f == "cpuid.html")]
for file in files:
    print("copying src/" + file + " to build/" + file)
    copyfile("src/" + file, "build/" + file)
print("done")
