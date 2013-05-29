// Generated by CoffeeScript 1.6.1
(function() {

  $(document).bind("pageshow", function(e) {
    var dateStr, getDateStr, validDateTxt, validator;
    console.log("write page.");
    getDateStr = function(date) {
      var month, today, year;
      today = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      date = date.getDate();
      return "" + year + "-" + month + "-" + date;
    };
    dateStr = getDateStr(new Date());
    $("#dateTxt").val(dateStr);
    validator = new Validator();
    validDateTxt = function() {
      var contentStr, date, months, year, _ref;
      dateStr = $.trim($("#dateTxt").val());
      contentStr = $.trim($("#content").val());
      try {
        validator.check(contentStr).notEmpty();
        validator.check(dateStr).notEmpty();
        _ref = dateStr.split("-"), year = _ref[0], months = _ref[1], date = _ref[2];
        validator.check(year).notNull().isNumeric().len(4, 4);
        validator.check(months).notNull().isNumeric().len(1, 2);
        validator.check(date).notNull().isNumeric().len(1, 2);
        return true;
      } catch (error) {
        return false;
      }
    };
    return $("#reportSubmitBtn").click(function(event) {
      var contentStr, data;
      if (validDateTxt()) {
        dateStr = $.trim($("#dateTxt").val());
        contentStr = $.trim($("#content").val());
        data = {
          date: dateStr,
          content: contentStr
        };
        return Model.createReport(data, function(response) {
          if (response.state === 0) {
            return;
          }
          return window.location.href = "/m/show";
        });
      } else {
        return $.mobile.changePage("#errorPage", {
          role: "dialog"
        });
      }
    });
  });

}).call(this);
