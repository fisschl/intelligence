$image = "registry.cn-shanghai.aliyuncs.com/fisschl/intelligence:latest"

docker build -t $image .
docker push $image
