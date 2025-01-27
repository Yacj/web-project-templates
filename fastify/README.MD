# 🚀 Fastify Node.js Boilerplate

一个功能完整的 Fastify 后端脚手架，集成了常用的项目特性和最佳实践。

## ✨ 特性

- 🛠️ **模块化设计** - 采用清晰的目录结构和模块化的代码组织
- 🔒 **内置安全机制** - JWT 认证、统一的错误处理
- 📝 **API 文档** - 集成 Swagger UI 自动生成 API 文档
- 🔄 **开发体验** - 支持热重载，快速的开发反馈
- 📊 **数据库集成** - Sequelize ORM，支持多种数据库
- 💾 **本地缓存** - 集成 Node-Cache 提升性能
- 📝 **日志系统** - 分别记录错误和 SQL 日志
- ⚙️ **环境配置** - 支持多环境配置管理

## 🔧 技术栈

- **核心框架：** Fastify 4.x
- **数据库：** MySQL（通过 Sequelize ORM）
- **认证：** JWT (@fastify/jwt)
- **文档：** Swagger (@fastify/swagger + @fastify/swagger-ui)
- **缓存：** Node-Cache
- **日志：** Winston
- **开发工具：** Nodemon
- **环境管理：** dotenv

## 📁 目录结构

```
src/
├── config/           # 配置文件
│   ├── database.js   # 数据库配置
│   └── jwt.js        # JWT 配置
├── plugins/          # Fastify 插件
│   ├── auth.js       # 认证插件
│   ├── swagger.js    # API 文档插件
│   └── cache.js      # 缓存插件
├── middlewares/      # 中间件
│   ├── error-handler.js    # 错误处理
│   └── response-formatter.js # 响应格式化
├── models/           # 数据模型
│   └── user.js       # 用户模型
├── routes/           # 路由文件
│   ├── index.js      # 路由注册
│   └── user.js       # 用户相关路由
├── utils/            # 工具函数
│   └── logger.js     # 日志工具
└── app.js           # 应用入口文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 14
- MySQL >= 5.7

### 安装

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install
```

### 配置

1. 复制环境变量文件
```bash
cp .env.example .env
```

2. 修改 `.env` 配置
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fastify_db
DB_USER=root
DB_PASS=password
JWT_SECRET=your-secret-key
```

### 运行

```bash
# 开发环境
npm run dev

# 生产环境
npm start
```

## 🛠️ API 文档

启动项目后访问：`http://localhost:3000/docs`

## 🔒 认证

项目使用 JWT 进行认证，在需要认证的路由中使用 `authenticate` 装饰器：

```javascript
fastify.get('/protected', 
  { onRequest: [fastify.authenticate] }, 
  async (request, reply) => {
    return { user: request.user };
  }
);
```

## 📝 日志

系统使用 Winston 处理日志，分为两类：

- **错误日志：** `logs/error.log`
- **SQL 日志：** `logs/sql.log`

## 🔄 响应格式

统一的响应格式：

```javascript
// 成功响应
{
  "success": true,
  "message": "success",
  "data": {}
}

// 错误响应
{
  "success": false,
  "message": "错误信息",
  "data": null,
  "code": 500 || '自定义错误码'
}
```

## 🎯 示例接口

### 用户登录
```http
POST /api/users/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

### 获取用户列表
```http
GET /api/users
Authorization: Bearer <token>
```

## 🔧 开发指南

### 添加新路由

1. 在 `routes` 目录创建路由文件（例如 `product.js`）：

```javascript
// src/routes/product.js
const { Product } = require('../models');

module.exports = async function (fastify, opts) {
  // 获取产品列表
  fastify.get('/', {
    schema: {
      description: '获取产品列表',
      tags: ['products'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 10 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  createdAt: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    handler: async (request, reply) => {
      const { page, limit } = request.query;
      const offset = (page - 1) * limit;
      
      const products = await Product.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
      
      return products;
    }
  });

  // 创建产品
  fastify.post('/', {
    schema: {
      description: '创建新产品',
      tags: ['products'],
      body: {
        type: 'object',
        required: ['name', 'price'],
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          description: { type: 'string' }
        }
      }
    },
    // 使用认证中间件
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const product = await Product.create(request.body);
      reply.code(201).send(product);
    }
  });

  // 获取单个产品
  fastify.get('/:id', {
    schema: {
      description: '获取产品详情',
      tags: ['products'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      }
    },
    handler: async (request, reply) => {
      const product = await Product.findByPk(request.params.id);
      if (!product) {
        reply.code(404).send({
          success: false,
          message: 'Product not found'
        });
        return;
      }
      return product;
    }
  });
};
```

2. 在 `routes/index.js` 注册路由：

```javascript
// src/routes/index.js
const userRoutes = require('./user');
const productRoutes = require('./product');

module.exports = async function (fastify, opts) {
  fastify.register(userRoutes, { prefix: '/api/users' });
  fastify.register(productRoutes, { prefix: '/api/products' });
};
```

### 添加新模型

1. 在 `models` 目录创建模型文件（例如 `product.js`）：

```javascript
// src/models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  // 模型选项
  timestamps: true,  // 添加 createdAt 和 updatedAt
  paranoid: true,   // 软删除，添加 deletedAt
  indexes: [
    {
      unique: true,
      fields: ['name']
    }
  ]
});

// 定义模型关联
Product.associate = (models) => {
  // 例如，与 Category 模型的关联
  Product.belongsTo(models.Category, {
    foreignKey: 'categoryId',
    as: 'category'
  });
  
  // 与 Order 模型的多对多关联
  Product.belongsToMany(models.Order, {
    through: 'OrderProducts',
    as: 'orders',
    foreignKey: 'productId'
  });
};

// 模型钩子
Product.beforeCreate(async (product) => {
  // 例如，在创建前处理一些数据
  product.name = product.name.trim();
});

// 模型方法
Product.prototype.isAvailable = function() {
  return this.status === 'active';
};

// 静态方法
Product.findAvailable = function() {
  return this.findAll({
    where: {
      status: 'active'
    }
  });
};

module.exports = Product;
```

2. 在 `models/index.js` 中注册模型（如果还没有这个文件，需要创建）：

```javascript
// src/models/index.js
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');

const models = {};

// 自动加载所有模型
fs.readdirSync(__dirname)
  .filter(file => 
    file.indexOf('.') !== 0 && 
    file !== 'index.js' && 
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// 注册模型关联
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
```

3. 使用示例：

```javascript
// 在路由或服务中使用模型
const { Product } = require('../models');

// 创建产品
const product = await Product.create({
  name: 'iPhone 13',
  price: 999.99,
  description: 'Latest iPhone model'
});

// 查询产品
const products = await Product.findAvailable();

// 使用模型方法
const isAvailable = product.isAvailable();
```

## 📦 生产部署

1. 设置生产环境变量
```bash
NODE_ENV=production
```

2. 构建并启动
```bash
npm run build
npm start
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🆘 支持

如有问题，请提交 Issue 联系我：
