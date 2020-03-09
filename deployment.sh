#!/bin/bash
## Usage
# This script automate the build and deploy process of the angular on aws
# It takes 2 arguments:
# -b OPTIONAL => if given just build the source code without deploying
# -e REQUIRED => indicates the aws environment where the deployment will happen. Either staging or prod.
#
##

DEPLOY_DIST_DIR="build"
DIST_DIR="dist"
BUILDONLY=0
CDN_STAGING_ID="EZ82NW25U8G2N"
CDN_PROD_ID="E33WW2DB2MO3HH"

function check_state(){
  if [ $? -eq 0 ];
  then
    return 1
  else
    return -1
  fi
}

while getopts ':e:bh' OPT
do
  case "${OPT}" in
    h)
      echo "$USAGE"
      echo "Use -b arguments to tell if you want to build only the source code without deploying"
      echo "Use -e to tell the environment where you wanna execute the program. Either staging or prod."
      exit 0
      ;;
    b)
      BUILDONLY=1
      ;;
    e)
    if [ -z "${OPTARG}" ];
    then
      echo -e {REDB}"Missing ENVIRONMENT parameter. Either local, dev or prod."${RST}
      exit 1
    else
      if [ ${OPTARG} != "local" ] && [ ${OPTARG} != "staging" ] && [ ${OPTARG} != "prod" ];
      then
        echo -e "Invalid value for parameter ENVIRONMENT."${RST}
        exit 1
      else
        ENVIRONMENT="${OPTARG}"
        if [ ${OPTARG} == "staging" ];
        then
          CDN_DISTRIBUTION_ID=$CDN_STAGING_ID
        fi

        if [ ${OPTARG} == "prod" ];
        then
          CDN_DISTRIBUTION_ID=$CDN_PROD_ID
        fi
      fi
    fi
    ;;
    \?)
      echo -e ${REDB}"Unknown option: $OPTARG"${RST}
      exit 1
  esac
done


if [ "$#" -eq 0 ];
then
  echo "Supply at least one argument"
  echo "Use argument -h to see usage"
  exit 1
fi

if [ -e $DEPLOY_DIST_DIR ];
then
  rm -rf $DEPLOY_DIST_DIR;
fi
mkdir $DEPLOY_DIST_DIR

echo "Installing packages:"
yarn install || exit 127
echo "Installation completed."

echo "Building application for ${ENVIRONMENT}:"
if [ ${ENVIRONMENT} == "prod" ]; then
  ng build --environment=prod --aot=true || exit 127
else
  ng build --aot=true || exit 127
fi
echo "Build completed."

cp -r $DIST_DIR/* $DEPLOY_DIST_DIR

if [ $BUILDONLY != 1 ];
then
  aws --profile "ca-${ENVIRONMENT}" s3 sync --delete build  "s3://com.angular.${ENVIRONMENT}.bo"
  check_state
  CHECK_STATUS=$?
  if [ $CHECK_STATUS -eq 1 ];
  then
    aws --profile "ca-${ENVIRONMENT}" cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths "/*"
  fi
fi

check_state
CHECK_STATUS=$?
if [ $CHECK_STATUS -eq 1 ];
  then
    if [ $BUILDONLY != 1 ];
    then
      echo "Deployed successfully on aws! see you soo!"
    fi
    if [ $BUILDONLY == 1 ];
    then
      echo "Built successfully! see you soo!"
    fi
    exit 0
else
  echo "Error during execution!"
  exit 1
fi
exit 0
