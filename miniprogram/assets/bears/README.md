# 布布一二图片替换说明

这里放小程序里使用的熊熊图片素材。

## 当前文件

- `bubu-yier-hi.jpeg`：登录页右侧横图
- `bubu-yier-field.jpeg`：首页右侧横图
- `bubu-hoodie.jpeg`：我的页顶部方图
- `bubu-zombie.jpeg`：计划详情页右上角方图

## 怎么替换图片

1. 把新图片放进这个目录：`miniprogram/assets/bears/`
2. 如果只是换图不改代码，可以直接覆盖同名文件。
3. 如果想换成新文件名，就改页面里的 `src`。

示例：

```xml
<image class="bear-art" src="/assets/bears/bubu-yier-hi.jpeg" mode="aspectFill" />
```

改成：

```xml
<image class="bear-art" src="/assets/bears/my-new-bear.png" mode="aspectFill" />
```

## 图片尺寸建议

- 横图：建议 `1600x900` 或接近 `16:9`，适合登录页、首页。
- 方图：建议 `1000x1000`，适合我的页、详情页小贴纸。
- 透明底 PNG 效果最好；JPEG 也能用，但会带背景。

## 显示方式

当前统一使用：

```xml
mode="aspectFill"
```

意思是图片会铺满容器，超出的部分裁掉。想完整显示整张图，可以改成：

```xml
mode="aspectFit"
```
