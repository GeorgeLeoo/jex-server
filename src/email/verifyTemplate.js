// 创建一个邮件对象
module.exports = function (sendInfo) {
  return {
    from: '"认证邮件 👻" <18921483103@qq.com>', // sender address
    to: sendInfo.to, // list of receivers
    subject: '【Jex科技】验证码', // Subject line
    text: `您的邀请码是${sendInfo.code}，过期时间：${sendInfo.expire}`, // plain text body
    html: `<div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="padding: 25px">
          <div>尊敬的${sendInfo.user}，您好，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：</div>
          <a href="" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>` // html body
  }
}
