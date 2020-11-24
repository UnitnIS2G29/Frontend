<template>
    <v-container>
        <v-row v-if="loading">
        <v-progress-circular indeterminate/>
        </v-row>
        <v-row v-else>

        <v-col cols="12" class="mt-5 mb-5">
            <v-row justify="center" style="margin-top:50px">
            <v-card v-if="currentTimer">
                <v-card-title>
                    <div style="width:100%;min-width:500px" justify="center">
                        <v-banner justify="center" elevation="12">{{this.elapsedTime}}</v-banner>
                    </div>
                </v-card-title>
                <v-card-text>
                     <v-btn color="red" @click.stop="editTimerHandler(currentTimer,true)" >STOP TIMER</v-btn>
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-card-title>
                    <div style="width:100%;min-width:500px" justify="center">
                        <b>Timer not running..</b>
                    </div>
                    
                </v-card-title>
                <v-card-text>
                    <v-btn color="green" @click.stop="startTimer()" >START TIMER</v-btn>
                </v-card-text>
            </v-card>
            </v-row>
        </v-col>
            
        <v-col cols="12">
            <h1 class="display-1" @click="showTimers = !showTimers">Timers <v-icon v-if="!showTimers">mdi-arrow-right-bold</v-icon><v-icon v-else>mdi-arrow-down-bold</v-icon> </h1>
        </v-col>
        <v-col cols="12" v-show="showTimers">
            <v-col cols="12" v-for="timer in timers" :key="timer._id" @click="editTimerHandler(timer)">
            <v-card link>
            <v-row align="center" no-gutters>
                <v-col cols="11">
                <v-card-title>
                    {{(timer.description) ? timer.description : ''}} <b style="margin-left:3px">{{(timer.category) ? "("+timer.category.name +")": ''}}</b>
                </v-card-title>
                    <v-card-text>
                        <small v-if="timer.stopped_at">
                            {{moment(timer.started_at).format('YYYY-MM-DD HH:mm')}} --> {{moment(timer.stopped_at).format('YYYY-MM-DD HH:mm')}} 
                        </small>
                        <small v-else>
                            {{moment(timer.started_at).format('YYYY-MM-DD HH:mm')}} (<i>running..</i>)
                        </small>
                    </v-card-text> 
                </v-col>
                <v-col cols="1">
                <v-card-actions><v-btn icon color="red" @click.stop="deleteTimerHandler(timer)" ><v-icon>mdi-delete</v-icon></v-btn></v-card-actions>
                </v-col>
            </v-row>
            </v-card>
        </v-col>
        </v-col>
        
        </v-row>
        <v-dialog v-model="editing">
        <v-card>
            <v-card-title>Gestisci Timer</v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col>
                    <v-text-field label="Descrizione Timer" v-model="description"></v-text-field>

                    <v-row>
                        <label for="started_at">Inizio Tracking</label><br>
                        <input class="form-control" type="datetime-local" id="started_at" name="started_at" :value="(started_at) ? (moment(started_at).format('YYYY-MM-DDTHH:mm:ss')) : null" @input="started_at = moment($event.target.value).utc().toISOString()"/>
                    </v-row>
                    <v-row>
                        <label for="stopped_at">Fine Tracking</label><br>
                        <input class="form-control" type="datetime-local" id="stopped_at" name="stopped_at" :value="(stopped_at) ? (moment(stopped_at).format('YYYY-MM-DDTHH:mm:ss')) : null" @input="stopped_at = moment($event.target.value).utc().toISOString()"/>
                    </v-row>

                    <v-select
                        v-model="category"
                        :items="categories"
                        item-text="name"
                        item-value="_id"
                        label="Categoria Timer"
                        return-object
                        single-line
                        ></v-select>
                    <v-btn @click="saveTimerHandler">Salva</v-btn>
                </v-col>
                </v-row>
            </v-container>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import timers from '../api/timers';
import categories from '../api/categories';

export default {
  name: "Timers",
  data: () => ({
    loading: false,
    timers: null,
    currentTimer: null,
    categories: [],
    editing: false,

    showTimers: false,

    elapsedTime: null,


    id: null,
    started_at: null,
    stopped_at: null,
    description: '',
    category: null,

    load: async function (){
        this.loading = true;

        this.timers = await timers.getList();
        this.currentTimer = await timers.getSelf();
        this.categories = await categories.getAll();

        this.loading = false;
    }
  }),

  
  async mounted() {
    this.load();
    this.$nextTick(function () {
        window.setInterval(() => {
            if(this.currentTimer){
                this.elapsedTime = this.timePassed(new Date(),this.currentTimer.started_at);
            }
        },1000);
    })
  },

  methods: {
    editTimerHandler: function(cat,stopNow = false) {

        if(cat && stopNow){
            cat.stopped_at = this.moment().utc().toISOString();
        }
        
        this.editing = true;
        
        this.id = (cat) ? cat._id : null;
        this.started_at = (cat && cat.started_at) ? cat.started_at : null;
        this.stopped_at = (cat && cat.stopped_at) ? cat.stopped_at : null;
        this.description = (cat) ? cat.description : null;
        this.category = (cat) ? cat.category : null;
    },
    deleteTimerHandler: async function(timer){
        if(timer._id){
            await timers.delete(timer._id);
        }
        this.load();
    },
    startTimer: async function(){
        timers.postSelf({started_at: this.moment().utc().toISOString()});
        this.load();
    },
    stopTimer: async function(){
        timers.stopSelf();
        this.load();
        this.editing = false;
    },
    saveTimerHandler: function(){
        if(this.id){
            timers.edit(this.id,{
                started_at: this.started_at,
                stopped_at: this.stopped_at,
                description: this.description,
                category: this.category
            });
        }else{
            timers.postSelf({
                started_at: this.started_at,
                stopped_at: this.stopped_at,
                description: this.description,
                category: this.category
            });
        }
        this.load();
        this.editing = false;
    },

    timePassed: function(now,then){
        var ms = this.moment(now).diff(this.moment(then));
        var d = this.moment.duration(ms);
        return Math.floor(d.asHours()) + this.moment(ms).format(":mm:ss");
    }

  }

}
</script>

<style>

</style>
