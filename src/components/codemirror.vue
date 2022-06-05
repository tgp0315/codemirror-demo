<template>
  <div class="editor">
    <div class="content">
      <div class="preview- example">
        <iframe
          id="iframe"
          src=""
          frameborder="0"
          @load="loaded"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="code-wrapper">
        <div class="code-header">
          <span>源代码编辑器</span>
          <div class="button-wrap">
            <span class="code run" @click="runCodeHandle">运行</span>
            <span class="code_restore" @click="resetHandle">还原</span>
          </div>
        </div>
        <div class="code-edit">
          <textarea ref="textarea" id="code" v-model="code"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="">
// language
import "codemirror/mode/vue/vue";

// theme
import "codemirror/theme/base16-light.css"
// styleSelectedText
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/search/searchcursor";
// hint
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/hint/show-hint.css";

//highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar";
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/match-highlighter";
// map
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/comment/comment";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/search";
import "codemirror/keymap/sublime";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/fold/markdown-fold";
import "codemirror/addon/fold/xml-fold";
import * as Codemirror from "codemirror/lib/codemirror";
export default {
  name: "codemirror",
  props: {
    url: {
      default: 'static/demo.html'
    },
  },
  data() {
    return {
      code: "",
      options: {
        mode: "htmlmixed",
        tabsize: 2, // 缩进格式
        indentWithTabs: true,
        styleActiveLine: true,
        lineNumbers: true,
        styleSelectedText: true,
        line: true,
        smartIndent: true,
        theme:"base16-light",
        foldGutter: true,
        autoRefresh: true,
        fullScreen:true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: / w/, annotateScrollbar: true },
        //  hint. js options
        hintoptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: true,
        },
        // 快捷键可提供三种模式sublime、 emacs、 vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        extraKeys: { Ctrl: "autocomplete" },
      },
      hide: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.initIframe();
      this.getSource();
    });
  },
  methods: {
    init() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = Codemirror.fromTextArea(this.$refs.textarea, this.options);
      this.coder.on("change", () => {
        // 事件触发后执行事件
        this.code = this.coder.getValue();
      });
    },
    runCodeHandle() {
      this.runcode(this.code)
      console.log(111111);
    },
    resetHandle() {
      this.initIframe();
      this.getSource();
    },
    loaded() {
      this.$emit("load");
    },
    initIframe() {
      const iframeEl = document.getElementById('iframe')
      iframeEl.src = this.url
      console.log(1111111);
    },
    getSource() {
      fetch(this.url).then(response => {
        return response.text()
      }).then(code => {
        // console.log(code)
        this.coder.setValue(code)
      })
    },
    runcode(iframeContent) {
      const nr = iframeContent.indexOf("<body>");
      const iframeHead = iframeContent.slice(0, nr);
      const iframeFooter = iframeContent.slice( nr , iframeContent.length);
      const iFrame = document.getElementById("iframe").contentWindow;
      iFrame.document.open();
      iFrame.document.write(iframeHead) ;
      iFrame.document.write(iframeFooter);
      iFrame , document.close();
    }
  },
};
</script>
<style lang=""></style>
