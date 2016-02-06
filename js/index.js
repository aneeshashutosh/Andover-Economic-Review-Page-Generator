var step = 1;
var MAX_STEPS = 11;

var text = "";
var footnotes = "";

var code = "";

$( "#next" ).click(function() {
	if (step === 1) {
		text = $("textarea#article").val();
	} else if (step === 2) {
		footnotes = $("textarea#footnotes").val();
		formatArticle();
	}
	$( "#step" + step ).fadeOut( "fast", loadLetterBox)
});

function loadLetterBox () {
	step++;	
	if (step >= MAX_STEPS) {
		step = 1;
	}
	if (step === 1) {
		$( "#instructions" ).text('Step 1: Copy and paste your article, minus the title, into the box above. Make sure that your footnotes are in the form "[1]".')
		$( "#next" ).text("Next step")
	} else if (step === MAX_STEPS) {
		$( "#next" ).text("Start over?")
	}
	$( "#step" + step ).fadeIn( "fast" ).css("display", "flex");
}

function formatArticle() {
	code = '<p style="text-align: justify;">' + text.replace(/(?:\r\n|\r|\n)/g, '</p><p style="text-align: justify;">').replace(/^\s+|\s+$/g, '').replace(/\n$/, "") + '</p>';

	console.log(code);

	var cites = footnotes.split(/(?:\r\n|\r|\n)/);

	for (var i = 1; i <= cites.length; i++) {
		var footnote = cites[i - 1];
		footnote = footnote.replace("[" + i + "]", "");
		footnote = "[ref]" + footnote.trim() + "[/ref]";
		code = code.replace("[" + i + "]", footnote);
	}

	$("textarea#code").val(code);
}