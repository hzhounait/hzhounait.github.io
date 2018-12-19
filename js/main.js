$('document').ready(function(e){
    let isLoaded = false;

    if(!isLoaded){
        isLoaded = true;

        let isPlayed = false;

        $('#musicPlay').click(function () {
            $('i', this).toggleClass("fa-volume-up fa-volume-off");
            if (!isPlayed) {
                isPlayed = true;
                console.log(document.querySelector('audio'))
                document.querySelector('audio').pause();
                document.querySelector('audio').currentTime = 0;
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
                    <span class="yes"><a class="btnYes" href="#">Yes I Do</a></span>
                    <span class="no"><a class="btnNo" href="#">No I Don't</a></span>
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
                                <span class="annotation">按钮好像失效了呢，试试Yes鸭 (°ཀ°)</span>
                            </li>
                            `  
                             $('.slideshowul').html(display);
                        }
                        
                    })

                    $('.btnYes').click(function(){
                        const display = 
                        `
                        <li>
                            <img src="img/jane_doe.jpg" class="photo" />
                        </li>
                        <li>
                            <span class="annotation">恭喜你不仅收获了一个泰迪熊玩偶，你还收获了一个大猪蹄子？！惊不惊喜？意不意外？原谅我用这种方式与你告白，套路也好，土味也罢！但是我是真的喜欢你鸭！</span>
                        </li>
                        `     
                       
                       $('.slideshowul').html(display);
                       $('.btnGroup').hide();

                    })
                }
            })
        })
    }else{
        isLoaded = false;
    }
})
