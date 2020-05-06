'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R32 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const metadata = DomUtils.getVideoMetadata(element);
    const track = element.getElement('track[kind="descriptions"]');
    const isVisible = DomUtils.isElementVisible(element);

    const hasPuppeteerApplicableData = metadata.puppeteer.video.duration > 0 && metadata.puppeteer.audio.hasSoundTrack;
    const applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.duration > 0 && metadata.service.audio.volume !== -91;

    if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't colect data from the test target.`;
      evaluation.resultCode = 'RC1';
    } else if (isVisible && applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the `track` element correctly describes the auditive content of the video.';
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the test target auditive content has accessible alternative.';
        evaluation.resultCode = 'RC3';
      }
    } else if (isVisible && hasPuppeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = `The test target has a sound track but we can't verify the volume. Check if the test target has audio and if it does check if the visual content has an accessible alternative.`;
      evaluation.resultCode = 'RC4';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target isn't a non-streaming \`video\` element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC5';
    }
    
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R32;
