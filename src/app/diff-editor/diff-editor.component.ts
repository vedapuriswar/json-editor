import { Component, OnInit, ViewChild} from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MonacoEditorLoaderService,
  MonacoDiffEditorComponent,
  MonacoDiffEditorConstructionOptions
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-diff-editor',
  templateUrl: './diff-editor.component.html',
  styleUrls: ['./diff-editor.component.scss']
})
export class DiffEditorComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private monacoLoaderService: MonacoEditorLoaderService
  ) {
    
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => !!isLoaded),
        take(1)
      )
      .subscribe(() => {
        this.registerMonacoJsonSchemaValidator();
        this.registerMonacoCustomTheme();
      });
  }

  ngOnInit(): void {
  }

  @ViewChild(MonacoDiffEditorComponent, { static: false })
  monacoComponent!: MonacoDiffEditorComponent;
  editorOptions: MonacoDiffEditorConstructionOptions = {
    theme: 'CustomTheme',
    roundedSelection: true,
    autoIndent: 'full'
  };

  originalCode = `{
    "city" : "Puducherry",
    "country": "India",
    "PIN": "605009"
  }`;
  code = `{
    "city" : "Puducherry",
    "PIN": "605009"
  }`;
  
  registerMonacoCustomTheme() {
    monaco.editor.defineTheme('CustomTheme', {
      base: 'vs-dark', 
      inherit: true,
      rules: [],
      colors: {}
    });
  }

  mergeOptions(partialOptions: any) {
    return {
      ...this.editorOptions,
      ...partialOptions
    };
  }
  registerMonacoJsonSchemaValidator() {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
      ]
    });
  }
}
