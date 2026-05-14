export async function onRequest(context) {
    const url = new URL(context.request.url);
    if (url.hostname === 'yuyuyuyu-an.pages.dev') {
        url.hostname = 'yuan.pub'; // 改成你的真实新域名
        return Response.redirect(url.toString(), 301);
    }
    return context.next();
}
