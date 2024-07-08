// 组件应用文档: https://bigfish.antgroup-inc.cn/docs/advanced/library
import { defineConfig } from '@alipay/bigfish-library';

export default defineConfig({
  // 这一层是 dumi（用于组件开发、Demo 编写）的配置项，请访问: https://d.umijs.org/config
  library: {
    // 以下是 father（用于组件源码构建）的配置项，请访问：https://github.com/umijs/father/blob/master/docs/config.md
    esm: {
      // 默认值为 dist/esm，如果要产出多种产物类型，可将 output 配置项删除使用默认值，如果仅产出 ESModule，建议维持 dist 以保持产物目录简洁
      output: 'dist',
    },
  },
});
