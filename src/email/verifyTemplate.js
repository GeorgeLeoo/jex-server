// 创建一个邮件对象
module.exports = function (user) {
  return {
    // 发件人
    from: '极客教程 <xxxx@163.com>',
    // 主题
    subject: '[极客教程]激活邮箱账号',
    // 收件人
    to: 'xxxx@qq.com',
    // 邮件内容，HTML格式
    text: `尊敬的${user.name}，您好！点击链接即可激活您的极客教程
           网账号,http://localhost:3000/checkCode?name=${user.name}&code=${user.code}为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 若如果您并未尝试修改密码，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！` //接收激活请求的链接
  }
}
