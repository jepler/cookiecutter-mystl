#!/usr/bin/python3

import os
import sys

MAKE_SCAD_STL = """
-include {target}.d
{target}: {src}
\tmkdir -p $(dir {target})
\topenscad -o {target}.tmp.stl -d {target}.d $(SCAD_FLAGS) {flags} {src}
\tadmesh -b {target} {target}.tmp.stl
\trm -f {target}.tmp.stl
default:: {target}
"""

MAKE_SCAD_PNG = """
-include {target}.d
{target}: {src}
\tmkdir -p $(dir {target})
\topenscad -o {target} -d {target}.d $(SCAD_FLAGS) {flags} {src}
default:: {target}
"""

MAKE_STL_PNG = """
-include {target}.d
{target}: {src}
\tmkdir -p $(dir {target})
\topenscad -o {target} -d {target}.d $(SCAD_FLAGS) {flags} -Dinput=\"{src}\" readfile.scad
default:: {target}
"""

with open(sys.argv[1]) as f:
    for row in f:
        parts = row.split(":", 2)
        if len(parts) == 1:
            target = parts
            src = f"{target}.scad"
            if not os.exists(src):
                src = f"{target}.stl"
            flags = ""
        if len(parts) == 2:
            target, src = parts
            flags = ""
        else:
            target, src, flags = parts

    target = target.strip()
    src = src.strip()
    flags = flags.strip()

    src = f"resources/{src}"
    target = f"resources/gen/{target}"

    if src.lower().endswith(".scad"):
        if target.lower().endswith(".stl"):
            print(MAKE_SCAD_STL.format(**{'target': target, 'src': src, 'flags': flags}))
        elif target.lower().endswith(".png"):
            print(MAKE_SCAD_PNG.format(**{'target': target, 'src': src, 'flags': flags}))
        else:
            print(f"# {target} has no recognized extension")
            print(MAKE_SCAD_STL.format(**{'target': f"{target}.stl", 'src': src, 'flags': flags}))
            print(MAKE_SCAD_PNG.format(**{'target': f"{target}.png", 'src': src, 'flags': flags}))
    elif src.lower().endswith(".stl"):
        if target.lower().endswith(".png"):
            print(MAKE_STL_PNG.format(**{'target': target, 'src': src, 'flags': flags}))
        else:
            print(MAKE_STL_PNG.format(**{'target': f"{target}.png", 'src': src, 'flags': flags}))
    else:
        raise RuntimeError(f"Don't know how to handle {src} -> {target}")
