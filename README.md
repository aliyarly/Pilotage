# 使用说明

## 后端

* 安装python3.5及pip3

* 安装虚拟环境的包管理工具
```
pip3 install pipenv

```
* 进入虚拟环境并安装相应的第三方包
```
cd src/api/
pipenv shell --three
pipenv install

```
* 本地运行服务
```
cd PilotageData
python3 manage.py runserver 0.0.0.0:8002
```

## 前端

* 安装nodejs8及npm包管理工具

* 前端服务运行

```
# 安装依赖
cd src/ui/PilotageWeb
npm install

# 本地开发调试
npm run start

# 创建开发环境的静态文件
npm run build:dev

# 创建线上环境的静态文件
npm runbuild:prod

```
