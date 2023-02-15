import html from "../core.js";

//nhận đối số là component - mặc định (selector = state => state)
const connector = connect()

//component trong trường hợp này là app, nhận hết tất cả những gì đẩy vào
function app({ cars }) {
    return html`
        <h1>hello world</h1>
    `
}

export default app