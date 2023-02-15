export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()), [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('')
}

export function createStore(reducer) { //nhận callback reducer
    let state = reducer() //dữ liệu trong store là state - return dữ liệu ban đầu của store cho state
    const roots = new Map() //chứa root element để render ra view - Map là object đặc biệt, có tính lặp qua và có thể đặt key bằng tất cả kiểu dữ liệu

    function render() {
        for (const [root, component] of roots) { //lặp qua roots ở trên để render ra view
            const output = component() //component sẽ return ra chuỗi html
            root.innerHTML = output
        }
    }

    return {
        attach(component, root) { //giúp nhận view đẩy ra root
            roots.set(root, component) //key là một ojbect(root) - thèn roots(Map-obj) được gán dữ liệu
            render()
        },
        //đẩy dữ liệu từ store vào view
        connect(selector = state => state) { //nhận vào một selector, giúp lựa chọn dữ liệu nào đấy cụ thể trong store - mặc định thì return tất cả state
            return component => (props, ...args) => //props là công cụ, dữ liệu muốn truyền vào component sau này
                component(Object.assign({}, props, selector(state), ...args)) //vì mấy thèn trên đều là Obj nền phải dùng Object.assign
        },
        //view muốn thực hiện hành động thì phải dispatch
        //nhận mô tả hành động (action) r đẩy cho reducer, args cho thêm sửa xóa
        dispatch(action, ...args) {
            //reducer làm việc với mảng, nó return ra state nên cần nhận lại chính giá trị nó return
            state = reducer(state, action, args)
            //thay đổi state là thay đổi store, store hiển thị gọi render
            render()
        }
    }
}