 YoutubeAutocomplete = {
    _:{
        input_search_selector:"#video_searcher",
        suggest_url: "http://suggestqueries.google.com/complete/search?client=youtube-reduced&ds=yt&gs_ri=youtube-reduced",
        minLength: 2
    },
    bind_autocomplete: function (input_search_selector){
        if (input_search_selector === undefined){
            input_search_selector = this._.input_search_selector;
        }
        var self = this;
        $(input_search_selector).autocomplete({
            source: function( request, response ) {
                $.ajax({
                    url: self._.suggest_url,
                    dataType: "jsonp",
                    data: {
                        q: $(input_search_selector).val()
                    },
                    success: function( data ) {
                        console.log(data[1]);
                        response( $.map( data[1], function( item ) {
                            return {
                                label: item[0],
                                value: item[0]
                            }
                        }));
                    }
                });
            },
            minLength: self._.minLength,
            select: function( event, ui ) {
                //change video
                $('#btn_video_searcher').trigger('click');
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        });
    },
    hide_autocomplete: function(){
        $('.ui-autocomplete').hide();
    }
 };
