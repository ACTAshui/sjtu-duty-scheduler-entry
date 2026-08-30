# SJTU Duty Scheduler Entry

固定入口页。GitHub Pages 自动跳转到腾讯 CloudBase 的国内稳定入口：

https://sjtu-duty-scheduler-d1bu58a2846d-1476562505.ap-shanghai.app.tcloudbase.com/

`target.json` 与页面按钮使用同一个固定地址。旧 EdgeOne 临时链接刷新逻辑已经停用，GitHub Actions 只在 `main` 更新或手动触发时发布入口页。

腾讯云免费默认域名首次访问会显示官方风险提醒。入口页会先明确提示用户点击“确定访问”，再延时自动跳转；该提醒只有绑定并完成备案的自有域名才能去除。
