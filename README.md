# 🌟 全栈项目模板集

欢迎使用 全栈项目模板集！本仓库旨在帮助开发者快速启动项目开发 🚀。
无论是前端 Vue 3 模板，还是后端 Fastify 脚手架，这里都为你准备好了开箱即用的解决方案！

## 📚 模板目录

### 🎨 前端模板
- **vue3**: Vue 3 + Vite PC端模板
    - ⚡️ 基于 Vite 的快速开发
    - 📦 组件自动导入
    - 🔧 ESLint 代码规范
    - 🎨 unocss 原子化设计
    - 🍍 pinia 状态管理
### 🛠 后端模板
- **fastify**: Fastify Node.js 企业级开发脚手架
    - ⚡️ 基于 Fastify 的高性能框架
    - 🔐 JWT 认证 & 安全机制
    - 📝 Swagger API 文档
    - 📊 Sequelize ORM 数据库操作
    - 💾 Node-Cache 本地缓存
    - 📋 Winston 日志系统

## 🎯 特性概览

### 前端（Vue3）
- 📱 响应式设计：适配多设备屏幕
- 🎨 支持全局样式与动态切换
- 📦 模块化开发：组件封装与复用
- 🔧 高效工具：内置工具函数与类型定义

### 后端（Fastify）
- 🚀 模块化路由
- 🛡 统一错误处理
- 📊 数据库集成
- 📝 自动 API 文档
- 🔒 安全中间件

## 🚀 快速开始

### Vue3 模板
```bash
# 克隆项目
git clone <repository-url>/vue3-template

# 安装依赖
cd vue3-template
npm install

# 启动开发服务器
npm run dev
```

### Fastify 模板
```bash
# 克隆项目
git clone <repository-url>/fastify

# 安装依赖
cd fastify
npm install

# 配置环境变量
cp .env.example .env

# 启动开发服务器
npm run dev
```

## 📖 详细文档

### Vue3 模板结构
```
vue3/
├── src/
│   ├── assets/      # 静态资源
│   ├── components/  # 组件
│   ├── router/      # 路由配置
│   ├── stores/      # 状态管理
│   ├── utils/       # 工具函数
│   └── views/       # 页面
```

### Fastify 模板结构
```
fastify-boilerplate/
├── src/
│   ├── config/      # 配置文件
│   ├── plugins/     # Fastify 插件
│   ├── middlewares/ # 中间件
│   ├── models/      # 数据模型
│   ├── routes/      # 路由文件
│   ├── utils/       # 工具函数
│   └── app.js       # 入口文件
```

## 🛠️ 技术栈

### 前端
- Vue 3
- Vite
- Vue Router
- Pinia
- unocss
- Axios
- ESLint

### 后端
- Fastify
- Sequelize
- JWT
- Swagger
- Winston
- Node-Cache
- MySQL

## 🔧 开发工具集成

- 📝 ESLint  代码格式化
- 📦 自动导入组件
- 🚀 热更新
- 📊 开发调试工具

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📋 模板使用建议

### 前端开发
- 遵循 Vue 3 组合式 API 最佳实践
- 合理划分组件层级
- 统一使用 Pinia 管理状态

### 后端开发
- 遵循 RESTful API 设计规范
- 使用 Swagger 文档记录 API
- 实现统一的错误处理
- 合理使用中间件和插件

## 📞 支持与交流

- 📮 提交 Issue
- 💬 讨论区交流
- 🌟 欢迎 Star & Fork

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

🎉 感谢使用我们的模板！祝您开发顺利！

如果觉得有帮助，别忘了给个 Star ⭐️
