$('document').ready(function(e){
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
        $('#iframeAudio').remove()
    }
    else {
        $('#playAudio').remove() //just to make sure that it will not have 2x audio in the background 
    }

    let isLoaded = false;

    if(!isLoaded){
        isLoaded = true;

        let isPlayed = false;

        $('#musicPlay').click(function () {
            $('i', this).toggleClass("fa-volume-up fa-volume-off");
            if (!isPlayed) {
                isPlayed = true;       
                document.querySelector('audio').pause();
            } else {
                isPlayed = false;
                document.querySelector('audio').play();
            }
        })

        $.getJSON('json/slides.json', function(data){

            const defaultDisplay = 
            `
            <li>
                <img src="img/${data[0].img}" class="photo" />
            </li>
            <li>
                <span class="annotation">${data[0].annotation}</span>
            </li>
            `
            $('.slideshowul').html(defaultDisplay);


            let count = data.length;
            let dataId = Number(document.querySelector('.btnNext').dataset.id);
            $('.btnNext').click(function(e){
                if(dataId < count - 1){
                    dataId += 1;                 
                    document.querySelector('.btnNext').dataset.id = dataId.toString();
                    console.log(document.querySelector('.btnNext').dataset.id)
                    console.log(e.currentTarget)

                    if(e.currentTarget.dataset.id != 0){
                        const display = 
                        `
                        <li>
                            <img src="img/${data[e.currentTarget.dataset.id].img}" class="photo" />
                        </li>
                        <li>
                            <span class="annotation">${data[e.currentTarget.dataset.id].annotation}</span>
                        </li>
                        `     
                       
                       $('.slideshowul').html(display);
                    }
                }
                else{
                    console.log("overlimit")
                    $('.next').hide();
                    const newBtn = 
                    `
                    <span class="yes"><a class="btnYes" href="#">OK</a></span>
                    <span class="no"><a class="btnNo" href="#">No!!!</a></span>
                    `
                    $('.btnGroup').html(newBtn);

                    let count = 0;
                    $('.btnNo').click(function(){
                        count++;
                        if (count <= 1){
                            const display = 
                            `
                            <li>
                                <span class="annotation">不再考虑一下吗！(　´・◡・｀)</span>
                            </li>
                            `  
                             $('.slideshowul').html(display);
                        }else{
                            const display = 
                            `
                            <li>
                                <span class="annotation">按钮好像失效了呢，试试OK鸭 (°ཀ°)</span>
                            </li>
                            `  
                             $('.slideshowul').html(display);
                        }
                        
                    })

                    $('.btnYes').click(function(){
                        const display = 
                        `
                        <li>
                            <img src="img/sorryaaaa.gif" class="photo" />
                        </li>
                        <li>
                            <span class="annotation">叩谢小祖宗隆恩，大傻子以后绝对好好对你！！！！！！！！！！！</span>
                        </li>
                        `     
                       
                       $('.slideshowul').html(display);
                       $('.btnGroup').hide();

                    })
                }
                e.preventDefault();
            })
        })
    }else{
        isLoaded = false;
    }
})
