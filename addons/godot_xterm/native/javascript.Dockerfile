# For convenient building of the library and gdnative export templates targeted at the javacript platform.
FROM emscripten/emsdk:3.1.14
RUN apt-get update && apt-get install pkg-config python3 -y
RUN pip3 install scons==4.4.0
