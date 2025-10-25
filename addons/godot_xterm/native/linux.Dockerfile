# Uses an old version of Ubuntu in order to target an old version of GLIBC so users
# with older versions of GLIBC installed on their systems can use the library.
FROM kroggen/ubuntu-16.04-gcc
RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:jblgf0/python
RUN add-apt-repository -y ppa:ubuntu-toolchain-r/test
RUN apt-get update -y
RUN apt-get install -y curl gcc-9-multilib g++-9-multilib python3.7
RUN curl -sS https://bootstrap.pypa.io/pip/3.7/get-pip.py | python3.7
RUN pip3 install scons==4.10.0
RUN apt-get remove -y cmake && pip3 install cmake==3.31.6
RUN ln -sf /usr/bin/gcc-9 /usr/bin/gcc
RUN ln -s /usr/bin/g++-9 /usr/bin/g++
VOLUME /scons-cache
CMD scons target=${TARGET:-template_release} arch=${ARCH:-x86_64}
