(function () {
    var dataService;
    var papa = require('papaparse');
    var h = require('virtual-dom/h');
    var that = {};
    that.template = function (services) {
        dataService = services.data;
        var uploadElement;
        // Check for the various File API support.
        if (window.FileReader) {
            uploadElement =
                h('input', {
                    type: 'file',
                    onchange: function(e){
                        loadFile(e);
                    }
                }, 'upload');
        }

        function loadFile(e) {
            var file = e.target.files[0];
            var reader  = new FileReader();
            reader.onloadend = function () {
                saveData(reader.result)
            };
            if (file) {
                reader.readAsText(file);
            }
        }

        function saveData(value) {
            dataService.set(papa.parse(value).data);
        }

        return uploadElement;
    };

    module.exports = that;
})();