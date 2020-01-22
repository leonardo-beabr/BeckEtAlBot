const date = new Date()
const checkLastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
// //new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
console.log('date: ', date)
console.log('dateSet: ', `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
console.log('checkLastDayOfMonth: ', checkLastDayOfMonth)
console.log('last day of the month: ', checkLastDayOfMonth.getDay())
console.log('Day of the week oh the checkLastDayOfMonth: ', checkLastDayOfMonth.getDate())
console.log('Day of the week: ', date.getDay(), 'current day: ', date.getDate())
// const date = new Date()
// const checkLastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0)
//Get the day of the Monday of the week
console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate()+3))
let startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate()+3)
let endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7)
// // startAt = `${date.getMonth() + 1}/${date.getDate() - date.getDay() + 8}/${date.getFullYear()}`
// if(date.getDate() - date.getDay() + 8 > checkLastDayOfMonth.getDate()){
//     startAt = `${date.getMonth() + 2}/${date.getDate() - date.getDay() - 27}/${date.getFullYear()}`
// }
// else{
//     startAt = `${date.getMonth() + 1}/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`
// }
// if(date.getDate() - date.getDay() + 1 < 1){
//     console.log('date.getDate() - date.getDay() + 1 < 1')
//     if(date.getMonth() === 0){
//         console.log('date.getMonth() === 0')
//         startAt = `${12}/${date.getDate() - date.getDay() + 8}/${date.getFullYear()}`; //Will get the Monday
//     }
//     else{
//         console.log('else 1')
//         startAt = `${date.getMonth()}/${date.getDate() - date.getDay() + 40}/${date.getFullYear()}`; //Will get the Monday
//     }
// }
// else{
//     console.log('else')
//     startAt = `${date.getMonth() + 1}/${date.getDate() - date.getDay() + 8}/${date.getFullYear()}`; //Will get the Monday
// }
// if(date.getDate() - date.getDay() + 5 >= 31){
//     console.log('date.getDate() - date.getDay() + 5 >= 31')
//     if(checkLastDayOfMonth.getDate() === 30){
//         console.log('checkLastDayOfMonth.getDate() === 30')
//         endAt = `${date.getMonth() + 2}/${date.getDate() - date.getDay() - 25}/${date.getFullYear()}`
//     }
//     else{
//         console.log('else 2')
//         endAt = `${date.getMonth() + 1}/${date.getDate() - date.getDay() + 13 }/${date.getFullYear()}`
//     }
// }
// else{
//     console.log('dkowkdwo')
//     endAt = `${date.getMonth() + 1}/${date.getDate() - date.getDay() + 12}/${date.getFullYear()}`
// }
console.log('Start: ', `${startAt.getMonth() + 1}/${startAt.getDate()}/${startAt.getFullYear()}`)
console.log('endAt: ', `${endAt.getMonth() + 1}/${endAt.getDate()}/${endAt.getFullYear()}`)
// if(checkLastDayOfMonth.getDay() === 6){

// }
// if(date.getDay() === 5){
//     let start = '', end = '';
//     if(checkLastDayOfMonth.getDate() === date.getDate()){
//         console.log('startDay: ', `${date.getMonth()+2}/${3}/${date.getFullYear()}`)
//         console.log('lastDay: ', `${date.getMonth()+2}/${7}/${date.getFullYear()}`)
//     }
//     else{
//         console.log('startDay: ', `${date.getMonth()+2}/${3}/${date.getFullYear()}`)
//         console.log('lastDay: ', `${date.getMonth()+2}/${7}/${date.getFullYear()}`)
//     }
// }
// if(checkLastDayOfMonth.getDate() === date.getDate()){//will see if the last day its the same of the current day
//     if(checkLastDayOfMonth.getDay() === 5){
//         console.log('startDay: ', `${date.getMonth()+2}/${3}/${date.getFullYear()}`)
//         console.log('lastDay: ', `${date.getMonth()+2}/${7}/${date.getFullYear()}`)
//     }
//     if(checkLastDayOfMonth.getDay() === 4){
//         console.log('startDay: ', `${date.getMonth()+2}/${4}/${date.getFullYear()}`)
//         console.log('lastDay: ', `${date.getMonth()+2}/${8}/${date.getFullYear()}`)
//     }
// }

