Spring Boot + Angular + Ant Design Archetype
==========

# 快速开始

## 创建项目

```
mvn archetype:generate -Dfilter=com.luhuiguo.archetypes:spring-angular-antd-archetype
```
按提示输入，即可生成项目。

## 运行

进入项目目录，输入
```
mvn spring-boot:run
```
即可运行，打开浏览器访问
```
http://localhost:8080
```

如果在开发过程中，需要启用livereload，前后端可以分别启动

```
mvn spring-boot:run -Dskip.npm
```
启动后端
```
cd frontend
npm start
```
启动前端，然后通过
```
http://localhost:4200
```
访问前端页面，这时对前端页面的修改，会自动刷新浏览器页面。

# 相关链接
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Angular](https://angular.io/)
* [Angular CLI](https://cli.angular.io/)
* [NG-ZORRO](https://ng.ant.design/)
* [AntV](https://antv.alipay.com/)
* [ng-alain](http://ng-alain.com/)
* [JHipster](http://www.jhipster.tech/)
