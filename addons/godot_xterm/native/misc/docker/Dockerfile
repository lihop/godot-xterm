FROM ponders/godot-cpp-ci

RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR emsdk
RUN ./emsdk install 2.0.10
RUN ./emsdk activate 2.0.10
RUN chmod -R 777 /emsdk
WORKDIR /godot
RUN apt-get update && apt-get install -y vim
COPY ./build.sh /build.sh
RUN chmod +x /build.sh
CMD /build.sh
