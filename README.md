# turtle judge
> turtle 绘图自动评判

- 提供模板 python 绘图代码，然后利用 skulpt 生成图像，图像会在 window.onload 函数的调用之后作为一个填充图片，并且是半透明的。
- 在代码输入框中输入用户代码，点击运行，用户代码会绘制图片。
- 绘制完毕，点击计算结果，会自动计算覆盖率，露出率，错误率。

存在问题：
- turtle 速度设置为0（即最快速）和其他速度绘制出来的图片对比，有少数几个像素是不一样的。比如，模板速度设为0，用户速度设为1，有少数几个像素不同。
