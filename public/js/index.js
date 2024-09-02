const vuoto = "/"
const player = [0,1]
let point = [49,49]
let pi = -1
const st = document.getElementById("start")
st.addEventListener("click",()=>{   
    setInterval(()=>{
        document.getElementById("turn").textContent = "Player" + (pi == -1 ? 0 : (pi == 1 ? 0 : 1 ))
    },0)
    document.querySelector(".cont").style.display = "none"   
    document.querySelector(".game").style.display = "flex"
    let matrice = createGr()
    matrice.forEach(t => {
        t.forEach(tt => {
            tt[0].addEventListener("click",()=>{
                if(tt[1] == vuoto)
                {
                    if(pi+1 >= player.length)
                    {
                        pi = 0
                    }
                    else
                    {
                        pi += 1
                    }
                    point[pi] = point[pi] - 1
                    matrice = insert(player[pi],[tt[2],tt[3]],matrice)
                    const su = suc(player[pi],matrice)
                    const or = orc(player[pi],matrice)
                    const dz = dzz(player[pi],matrice)
                    const dr = drr(player[pi],matrice)
                    if(su == true||or == true||dz == true||dr == true)
                    {
                        let u = JSON.parse(localStorage.getItem("rec")) || []
                        u.push([player[pi],point[pi]])
                        localStorage.setItem("rec",JSON.stringify(u))
                        alert("Vince Player " + player[pi])
                        window.location.reload()
                    }
                }
            })
        })
    })
    setInterval(()=>{
        let r = false
        let fg = false
        for (let row = 0; row < 7; row++) 
        {
            for (let col = 0; col < 7; col++) 
            {
                if(matrice[row][col][1] == vuoto)
                {
                    r = false
                    fg = true
                    break;
                }
                else
                {
                    r = true
                }
            }
            if(fg == true) break;
        }
        if(r)
        {
            let u = JSON.parse(localStorage.getItem("rec")) || []
            u.push("Pareggio")
            localStorage.setItem("rec",JSON.stringify(u))
            alert("Pareggio")
            window.location.reload()
        }
    },0)
})
document.getElementById("rec").addEventListener("click",()=>{
    window.location.reload()
})
document.getElementById("start2").addEventListener("click",()=>{
    const u = JSON.parse(localStorage.getItem("rec")) || null
    if(u != null)
    {
        let sd = ""
        u.forEach(i => {
            if(typeof i == "string")
            {
                sd += i + "\n"
            }
            else if(typeof i == "object")
            {
                sd += "Vittoria di Player " + i[0] + " con " + i[1] + " punti\n"
            }
        })
        console.clear()
        console.log(sd)
        alert("Cronologia stampata in console")
    }
    else
    {
        alert("Cronologia vuota")
    }
})
const createGr = ()=>{
    let matr = []
    for(let i = 0;i<7;i++)
    {
        let t = []
        for(let j = 0;j<7;j++)
        {
            const e = document.createElement("div")
            e.className = "cella"
            e.textContent = vuoto
            document.querySelector(".gridla").appendChild(e)
            t.push([e,vuoto,i,j])
        }
        matr.push(t)
    }
    return matr
}
const insert = (value,posi,mat)=>{
    for(let i = posi[0];i<mat.length;i++)
    {
        if(mat[i+1] == undefined)
        {
            mat[i][posi[1]][1] = value
            mat[i][posi[1]][0].textContent = value
            break;
        }
        if(mat[i+1][posi[1]][1] != vuoto)
        {
            mat[i][posi[1]][1] = value
            mat[i][posi[1]][0].textContent = value
            break;
        }
    }
    return mat
}
const suc = (value, mat) => {
    for (let col = 0; col < 7; col++) {
        let count = 0;
        for (let row = 0; row < 7; row++) {
            if (mat[row][col][1] === value) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
    }
    return false;
}
const orc = (value, mat) => {
    for (let row = 0; row < 7; row++) {
        let count = 0;
        for (let col = 0; col < 7; col++) {
            if (mat[row][col][1] === value) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
    }
    return false;
}
const dzz = (value, mat) => {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (mat[row][col][1] === value &&
                mat[row+1][col+1][1] === value &&
                mat[row+2][col+2][1] === value &&
                mat[row+3][col+3][1] === value) {
                return true;
            }
        }
    }
    return false;
}
const drr = (value, mat) => {
    for (let row = 0; row < 4; row++) {
        for (let col = 3; col < 7; col++) {
            if (mat[row][col][1] === value &&
                mat[row+1][col-1][1] === value &&
                mat[row+2][col-2][1] === value &&
                mat[row+3][col-3][1] === value) {
                return true;
            }
        }
    }
    return false;
}