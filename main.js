/* 
<div class="items col">
    <div class="img col l-2">
        <img src="./img/ely.png" alt="">
    </div>
    <div class="detail col l-10">
        <div class="detail-item">
            <h3 class="">
                Ely Winata
            </h3>
            <p>
                0812-3456-7890
            </p>
        </div>
    </div>
</div>
*/

const list = document.querySelector(".list");
const search = document.querySelector(".search");

let style = document.createElement('style');
style.innerHTML = `
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
`;
document.head.appendChild(style);

const listItems = [];

search.addEventListener("input", (e) => filterInput(e.target.value));


async function renderList() {
    const responseAPI = await fetch("https://randomuser.me/api/0.8/?results=50");
    const { results } = await responseAPI.json();

    list.innerHTML = "  <div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>";

    setTimeout(() => {
        list.innerHTML = "";
        results.forEach((user) => {

            const item = document.createElement("div");
            listItems.push(item);
            item.classList.add("items", "col");
            item.innerHTML = `
            <div class="img col l-3 m-2">
                <img src="${user.user.picture.medium}" alt="">
            </div>
            <div class="detail col l-9 m-10">
                <div class="detail-item">
                    <h3 class="">
                        ${user.user.name.first} ${user.user.name.last}
                    </h3>
                    <p>
                        ${user.user.cell}
                    </p>
                </div>
            </div>
        `;
            list.appendChild(item);
        });
    }, 2000);
}

function filterInput(value) {

    const searchForm = value.toLowerCase();
    listItems.forEach((item) => {
        if (item.innerText.toLowerCase().includes(searchForm)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });
}



renderList();
