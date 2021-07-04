import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { location } from '../json-examples';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'CustomTheme',
    roundedSelection: true,
    autoIndent: 'full'
  };

  reactiveForm: FormGroup;
  modelUri!: monaco.Uri;

  constructor(
    private monacoLoaderService: MonacoEditorLoaderService,
    private fb: FormBuilder
  ) {
    this.reactiveForm = this.fb.group({
      code: [location]
    });
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

  mergeOptions(partialOptions: any) {
    return {
      ...this.editorOptions,
      ...partialOptions
    };
  }

  registerMonacoCustomTheme() {
    monaco.editor.defineTheme('CustomTheme', {
      base: 'vs-dark', 
      inherit: true,
      rules: [],
      colors: {}
    });
  }

  registerMonacoJsonSchemaValidator() {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: []
    });
  }
  ngOnInit(): void {

  }
}
