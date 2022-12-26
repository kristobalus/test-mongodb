
const axios = require('axios').default;
const assert = require("assert");

(async () => {

    const time = Date.now()
    const count = 1000
    const concur = 10
    for(let id = concur; id < count; id++) {
        const tasks = []
        for(let j = 0; j < concur; j++) {
            tasks.push(axios.get(`http://localhost:8080/users/${id - concur + j}`))
        }
        await Promise.all(tasks)
    }
    const diff = Date.now() - time
    console.log(`millis per op`, diff/(count * concur))
    console.log(`op/s`, (count * concur)/diff * 1000)

})().catch(err => console.log(err))

