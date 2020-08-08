#!/usr/bin/python3

import os
import pathlib
import shlex
import sys
import yaml

resources = pathlib.Path("resources")

MAKE_SCAD_STL = """
-include {target}.d
{target}: {src}
\t$(ECHO) $target
\t$(Q)mkdir -p $(dir {target})
\t$(Q)openscad -o {target}.tmp.stl -d {target}.d $(SCAD_FLAGS) {flags} {src}
\t$(Q)admesh -b {target} {target}.tmp.stl
\t$(Q)rm -f {target}.tmp.stl
default: {target}
"""

MAKE_SCAD_SVG = """
-include {target}.d
{target}: {src}
\t$(ECHO) $target
\t$(Q)mkdir -p $(dir {target})
\t$(Q)openscad -o {target} -d {target}.d $(SCAD_FLAGS) {flags} {src}
default: {target}
"""

MAKE_SCAD_PNG = """
-include {target}.d
{target}: {src}
\t$(ECHO) $target
\t$(Q)mkdir -p $(dir {target})
\t$(Q)openscad --imgsize=1800,1800 -o {target}.tmp.png -d {target}.d $(SCAD_FLAGS) {flags} {src}
\t$(Q)convert -geometry 25% {target}.tmp.png {target}
\t$(Q)rm -f {target}.tmp.png
default: {target}
"""

MAKE_STL_PNG = """
-include {target}.d
{target}: {src}
\t$(ECHO) $target
\t$(Q)mkdir -p $(dir {target})
\t$(Q)openscad --imgsize=1800,1800 -o {target}.tmp.png -d {target}.d $(SCAD_FLAGS) {flags} -Dinput=\\\"{src}\\\" _lib/readfile.scad
\t$(Q)convert -geometry 25% {target}.tmp.png {target}
\t$(Q)rm -f {target}.tmp.png
default: {target}
"""

with open(sys.argv[1]) as f:
    doc = yaml.safe_load(f)

for row in doc:
    flags = row.get('flags', '')
    if isinstance(flags, str):
        flags = flags.split()
    flags = " ".join(shlex.quote(f) for f in flags)
    scad = row.get('scad', '')
    stl = row.get('stl', '')
    svg = row.get('svg', '')
        
    if stl.startswith('gen/'):
        print(MAKE_SCAD_STL.format(
            **{'target': resources / stl, 'src': resources / scad, 'flags': flags}))

    if svg.startswith('gen/'):
        print(MAKE_SCAD_SVG.format(
            **{'target': resources / svg, 'src': resources / scad, 'flags': flags}))

    for png in row.get('images', []):
        if png.startswith('gen/'):
            if scad:
                print(MAKE_SCAD_PNG.format(
                    **{'target': resources / png, 'src': resources / scad, 'flags': flags}))
            else:
                print(MAKE_STL_PNG.format(
                    **{'target': resources / png, 'src': resources / stl, 'flags': flags}))
