FROM centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release

# Install Node.js and npm
RUN yum install -y nodejs npm

# Bundle app source
COPY . /app/dist
WORKDIR /app/dist

# Install app dependencies
RUN npm install

# FIXME This does nothing as the resources are already copied across
# build static assets using gulp and copy across to assets
RUN npm i gulp -g
RUN gulp build

EXPOSE  4444
CMD ["node", "/app/dist/server.js"]