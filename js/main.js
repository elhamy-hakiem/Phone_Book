var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCompanyInp = document.getElementById("productCompany");
var productDescInp = document.getElementById("productDesc");
var imgSrc;
var currentUpdateProduct;
var productContainer;

if(localStorage.getItem("Products")==null)
    {
        productContainer=[];
    }
else
    {
        productContainer = JSON.parse(localStorage.getItem("Products"));
        displayProduct();
    }


var imgBtn=document.getElementById("imgBtn");
imgBtn.addEventListener("click",function()
                       {
    var src=prompt("Please enter Image Source", "img/product.ex");
    imgSrc=src;
})

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
   if(validtaionform()==true&&addBtn.innerHTML=="Add Product")
        {
            addProduct();
            displayProduct();
            clearForm();
        }
    else
        {
             if (validtaionform()==true)
                 {
                    updateProduct();
                    displayProduct();
                    clearForm();
                    addBtn.innerHTML="Add Product";
                 }
        }
})

function addProduct() {
    var product = {
        src:imgSrc,
        name: productNameInp.value,
        price: productPriceInp.value,
        company: productCompanyInp.value,
        description: productDescInp.value
    }
    productContainer.push(product);
    localStorage.setItem("Products",JSON.stringify(productContainer));
}
function displayProduct()
{
    var cols=``;
    for(let i=0;i<productContainer.length;i++)
        {
            cols +=`<div class="col-md-4 col-sm-6">
                    <div class="productItem text-center pb-3 mb-3">
                    <img class="img-fluid productImg" src="`+productContainer[i].src+`">
                        <div class="productInfo px-3">
                        <h3 class="mt-2">`+productContainer[i].name+`</h3>
                        <span class="d-block">`+productContainer[i].price+`</span>
                        <span class="d-block">`+productContainer[i].company+`</span>
                        <p>`+productContainer[i].description+`</p>
                        <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
                        <button class="btn btn-danger mr-1" onclick="setForm(`+i+`)">Update</button>
                        </div>
                    </div>
                </div>`
        }
    document.getElementById("productsRow").innerHTML=cols;
}
function clearForm()
{
   let inputs= document.getElementsByClassName("form-control");
    for(let i=0;i<inputs.length;i++)
        {
            inputs[i].value="";
        }
}
function deleteProduct(id)
{
    productContainer.splice(id,1);
    localStorage.setItem("Products",JSON.stringify(productContainer));
    displayProduct();
}
var alertContainerInp=document.getElementById("alertcontainer");
function validtaionform()
{
    var errors="";
    var nameRegex=/[A-Za-z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/g;
    var priceRegex=/^([$€£]||LE)[1-9][0-9]{2,5}$/;
    
    if(nameRegex.test(productNameInp.value) == false)
        {
           errors+="<h1>product Name error</h1>"; 
        }
      if(priceRegex.test(productPriceInp.value) == false)
        {
           errors+="<h1>price error</h1>"; 
        }
    
    if(errors.length>0)
        {
            alertContainerInp.style.display="block";
            alertContainerInp.innerHTML=errors;
            return false;
        }
    else{
        alertContainerInp.style.display="none";
        return true;
    }
}

var imgSrcUpdate;

function setForm(id)
{
    currentUpdateProduct=id;
    addBtn.innerHTML="Update Product"
    imgSrcUpdate=prompt("Update Image Source",""+productContainer[id].src+"");
    productNameInp.value=productContainer[id].name;
    productPriceInp.value=productContainer[id].price;
    productCompanyInp.value=productContainer[id].company;
    productDescInp.value=productContainer[id].description;
}
function updateProduct()
{
    productContainer[currentUpdateProduct].src=imgSrcUpdate;
    productContainer[currentUpdateProduct].name=productNameInp.value;
    productContainer[currentUpdateProduct].price=productPriceInp.value;
    productContainer[currentUpdateProduct].company=productCompanyInp.value;
    productContainer[currentUpdateProduct].description=productDescInp.value;
    localStorage.setItem("Products",JSON.stringify(productContainer));
}

var searchInp=document.getElementById("searchInp");
searchInp.onkeyup = function()
{
    searchProducts(searchInp.value);
}

function searchProducts(term)
{
    var searchCols=``;
    for(let i=0;i<productContainer.length;i++)
    {
        if(productContainer[i].name.includes(term))
        {
                searchCols +=`<div class="col-md-4 col-sm-6">
                    <div class="productItem text-center pb-3 mb-3">
                    <img class="img-fluid productImg" src="`+productContainer[i].src+`">
                    <div class="productInfo px-3">
                    <h3 class="mt-2">`+productContainer[i].name+`</h3>
                    <span class="d-block">`+productContainer[i].price+`</span>
                    <span class="d-block">`+productContainer[i].company+`</span>
                    <p>`+productContainer[i].description+`</p>
                    <button class="btn btn-danger mr-1" onclick="updateProduct(`+i+`)">Update</button>
                    <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
                    </div>
                    </div>
                 </div>`;
        }
    }
    document.getElementById("searchRow").innerHTML=searchCols;
}











