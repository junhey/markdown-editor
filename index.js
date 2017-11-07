// handle tab intextarea
function handleTab() {
    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function(e) {
        if (e.keyCode == 9 || e.which == 9) {
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}
}

handleTab();

var md = new Vue({
    el: '#editor',
    data: {
        input: '',
        editMode: true
    },
    filters: {
        marked: marked
    }
});

md.$watch('input', function(oldVal, newVal) {
    var elements = document.getElementsByTagName("code");
    
    for (var i= 0; i < elements.length; i++) {
        hljs.highlightBlock(elements[i]);
    }
});

var menu = new Vue({
    el: '#menu',
    data: {
        selected: '.md',
        options: [
            { text: '.md', value: '.md' },
            { text: '.txt', value: '.txt' }
        ]
    },
    methods: {
        onDownload: function(type) {
            var fileName = 'download' + type;
            download(md.input, fileName, "text/plain");
        },
        onChangeMode: function(editMode) {
            md.editMode = !md.editMode
        }
    },
    computed: {
        mode: function() {
            return md.editMode ? 'Preview' : 'Edit markdown'
        }
    }
});