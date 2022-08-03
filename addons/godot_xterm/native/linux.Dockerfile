# Uses an old version of Ubuntu in order to target an old version of GLIBC so users
# with older versions of GLIBC installed on their systems can use the library.
FROM kroggen/ubuntu-16.04-gcc
RUN apt-get update -y
RUN apt-get install -y python3 python3-pip gcc-multilib g++-multilib
RUN pip3 install scons==4.3.0
CMD scons platform=linux generate_bindings=yes target=${TARGET:-release} bits=${BITS:-64} -j$(nproc)
