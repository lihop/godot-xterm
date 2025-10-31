# Uses an old version of Ubuntu in order to target an old version of GLIBC so users
# with older versions of GLIBC installed on their systems can use the library.
FROM ubuntu:18.04
RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ubuntu-toolchain-r/test
RUN dpkg --add-architecture i386
RUN apt-get update -y
RUN apt-get install -y curl make python3.7 python3.7-distutils \
      gcc-9-multilib g++-9-multilib libc6-dev-i386 linux-libc-dev:i386 \
      gcc-7-arm-linux-gnueabihf g++-7-arm-linux-gnueabihf gcc-7-aarch64-linux-gnu g++-7-aarch64-linux-gnu
RUN curl -sS https://bootstrap.pypa.io/pip/3.7/get-pip.py | python3.7
RUN pip3 install scons==4.10.0
RUN apt-get remove -y cmake && pip3 install cmake==3.31.6
RUN ln -sf /usr/bin/gcc-9 /usr/bin/gcc
RUN ln -s /usr/bin/g++-9 /usr/bin/g++
VOLUME /scons-cache
CMD scons target=${TARGET:-template_release} arch=${ARCH:-x86_64}
