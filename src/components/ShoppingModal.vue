<template>
    <div>
        <div class="modal fade coupon-modal" id="exampleModalCenter" tabindex="-1" 
        role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-body coupon-poster-background">
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

$(function(){
	$(document).ready(function() { 
        $('.coupon-modal').modal('show');
        $(this).click(function() {
            $('.coupon-modal').modal('hide');
        })
    });
});
</script>

<style scope>
.coupon-poster-background {
    background-image: url("https://i.imgur.com/eIIVX6z.png");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
} 


@media screen and (min-width: 992px) {
    .coupon-poster-background {
        height: 500px;
        width: 500px;
    } 
}

@media screen and (max-width: 992px) and (min-width: 768px) {
   .coupon-poster-background {
        height: 500px;
        width: 500px;
    } 
}

@media screen and (max-width: 768px) and (min-width: 576px) {
    .coupon-poster-background {
        height: 400px;
        width: 400px;
    } 
    .modal-content {
        height: 400px;
        width: 400px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    } 
}

@media screen and (max-width: 576px) {
    .coupon-poster-background {
        height: 250px;
        width: 250px;
    } 
    .modal-content {
        height: 250px;
        width: 250px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    } 
}
</style>