PodcastView = Backbone.View.extend({

    events: {
        'click .subscribe' : 'subscribeToggle',
        'click .updateEpisodes': 'updateEpisodes'
    },

    initialize: function(){
        this.render();
        this.listenTo(this.model, 'change', this.render); 
    },

    render: function(){
        // Create the HTML
        var template = this.template({
            podcast_title: this.model.get('title'), 
            podcast_link: this.model.get('link'),
            subscribed: this.model.get('subscribed'),
            podcast_description: this.model.get('description')
        });

        this.$el.html(template);

        // Add in the episodes
        this.episodes = this.$el.find("#episodes");

        var podcastEpisodesItems = this.model.getEpisodes();

        if(podcastEpisodesItems.length == 0){
            // Render not items?
            this.episodes.append('<li>No items in queue</li>');
            return this;
        }

        _.each(podcastEpisodesItems, function(episode){
            var view = new EpisodeItemView({ model: episode });
            
            this.episodes.append(view.render().el);
        }, this);


        // Returning the object is a good practice
        // that makes chaining possible
        return this;
    },

    subscribeToggle: function(){
        this.model.set('subscribed', !this.model.get('subscribed'));
        this.model.save();
    },

    updateEpisodes: function(){
        this.model.updateEpisodes();
    }
});