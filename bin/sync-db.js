const models = require('../models');



module.exports=()=>{
    // 테스트 환경에서는 매번 실행될때마다 데이터를 싹 밀게끔 설정
    // 실제 서버에서는 false 값을 줌으로써 데이터 보존
    const options = {
        force:process.env.NODE_ENV==='test' ? true:false
    };
    return  models.sequelize.sync(options);
    // true값은 db에 값이 있으면 매번 날리고 새로운 db를 만들겠따는 의미.
}