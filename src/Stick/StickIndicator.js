define(["Inheritance", "IndicatorBase", "text!stick-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying stick movement values 
     * @alias StickIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var StickIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init("stick-svg", function () {
            instance.stickElement = instance.svgElement.getElementById("stick-element");
            instance.stickElement.setAttribute("transform", "");
        });
    };
    Inheritance.inheritPrototype(StickIndicator, IndicatorBase);
    /** 
     * @param {Number} x - x value for movement of stick -> Range from -1 to 1
     * @param {Number} y - y value for movement of stick -> Range from -1 to 1
     */
    StickIndicator.prototype.update = function (x, y) {
        if (this.isReady) {
            var xValue, yValue;
            // TODO: BoundCheck einbauen
            // Set proper x value
            if (this.isPositiveNumber(x)) {
                xValue = this.calculatePercentage(x, this.svgBounds.high);
            } else if (this.isNegativeNumber(x)) {
                xValue = this.calculatePercentage(x, this.svgBounds.low);
            } else {
                xValue = 0;
            }
            // Set proper y value
            if (this.isPositiveNumber(y)) {
                yValue = this.calculatePercentage(y, this.svgBounds.high);
            } else if (this.isNegativeNumber(y)) {
                yValue = this.calculatePercentage(y, this.svgBounds.low);
            } else {
                yValue = 0;
            }

            this.stickElement.attributes.transform.nodeValue = "translate(" + xValue + ", " + (-yValue) + ")";
        }
    };
    return StickIndicator;
});