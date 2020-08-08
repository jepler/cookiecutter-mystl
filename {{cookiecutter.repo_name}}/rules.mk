# resources/gen/main has no recognized extension

-include resources/gen/main.stl.d
resources/gen/main.stl: resources/main.scad
	mkdir -p $(dir resources/gen/main.stl)
	openscad -o resources/gen/main.stl.tmp.stl -d resources/gen/main.stl.d $(SCAD_FLAGS)  resources/main.scad
	admesh -b resources/gen/main.stl resources/gen/main.stl.tmp.stl
	rm -f resources/gen/main.stl.tmp.stl
default:: resources/gen/main.stl


-include resources/gen/main.png.d
resources/gen/main.png: resources/main.scad
	mkdir -p $(dir resources/gen/main.png)
	openscad -o resources/gen/main.png -d resources/gen/main.png.d $(SCAD_FLAGS)  resources/main.scad
default:: resources/gen/main.png

