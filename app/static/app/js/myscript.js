

$('.plus-cart').click(function(){
    var id= $(this).attr("pid").toString();
    var eml = this.parentNode.children[2]
    console.log("pid=", id)
    $.ajax({
        type:"GET",
        url:"/pluscart",
        data:{
            prod_id:id
        },
        success:function(data){
            console.log("data =" ,data);
            eml.innerText= data.quantity
            document.getElementById("amount").innerText= data.amount
            document.getElementById("totalamount").innerText = data.totalamount
        }
    })
})

$('.minus-cart').click(function(){
    var id= $(this).attr("pid").toString();
    var eml = this.parentNode.children[2]
    console.log("pid=", id)
    $.ajax({
        type:"GET",
        url:"/minuscart",
        data:{
            prod_id:id
        },
        success:function(data){
            eml.innerText= data.quantity
            document.getElementById("amount").innerText= data.amount
            document.getElementById("totalamount").innerText = data.totalamount
        }
    })
})

$(document).ready(function(){
    $('.remove-cart').click(function(e){
        e.preventDefault();  // Prevent the default action (e.g., navigating to a link)
        
        var id = $(this).attr("pid").toString();
        var eml = this.parentNode.querySelector('span');  // Use querySelector for better readability
        
        console.log("pid=", id);
        
        $.ajax({
            type: "GET",
            url: "/removecart/",
            data: {
                prod_id: id
            },
            dataType: "json",
            success: function(data){
                // Update the displayed amounts
                $('#amount').text('Rs. ' + data.amount);
                $('#totalamount').text('Rs. ' + data.totalamount);
                
                // Remove the item from the DOM
                $(eml).closest('.row').remove();  // Remove the closest row containing the item
            },
            error: function(xhr, status, error){
                console.log('Error:', error);
                // Optionally, display an error message to the user
            }
        });
    });
});
