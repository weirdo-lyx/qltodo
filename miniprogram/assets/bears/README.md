# 布布一二图片替换说明

这里放小程序里使用的熊熊图片素材。

## 当前文件

- `bubu-yier-hi.jpeg`：登录页、另一只小熊绑定页横图
- `bubu-yier-field.jpeg`：首页右侧横图
- `bubu-hoodie.jpeg`：我的页顶部方图
- `bubu-zombie.jpeg`：约定详情空状态备用图
- `0c8362145658f381127d820d34addb32.jpg`：首页糖果贴纸
- `2576ebd3f638696674dad516370ddd79.jpg`：布布糖罐页顶部图
- `391c197aa290ff3bb89ff56b4a13ed82.jpg`：新建约定页顶部图
- `45e089bff63823f34dd5493c839cf6d0.jpg`：约定详情页顶部图
- `72ddba9eab32e8abcb3c565df7ef0734.jpg`：登录贴纸、另一只小熊页、约定空状态
- `8acc28dfe40e7aa221dfb8cf838789e0.jpg`：约定小窝、首页空状态
- `afc5d456d3f2f5375d501f53e6ef0f85.jpg`：糖罐流水空状态

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

当前主要使用两种方式：

```xml
mode="aspectFill"
```

意思是图片会铺满容器，超出的部分裁掉。想完整显示整张图，可以改成：

```xml
mode="aspectFit"
```

方形贴纸图大多用 `aspectFit`，避免布布一二被裁掉；横图 hero 区域继续用 `aspectFill`，画面会更饱满。
