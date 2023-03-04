import { createSignal, For, onCleanup, Show } from 'solid-js';
import { KeyInput } from '../entity';
import { windowPreventDefault } from '../tool';
import { EventEmitter } from '../design/Eventable';
windowPreventDefault('keydown');
export class Profiler {
    event;
    render;
    toggleKI;
    visibility;
    setVisibility;
    _toggle;
    constructor(profiles) {
        this._toggle = (e) => {
            if (this.toggleKI.equal(e)) {
                const on = this.visibility() === 'hidden';
                this.setVisibility(on ? 'visible' : 'hidden');
                this.event.emit('toggle', on);
            }
        };
        this.event = new EventEmitter();
        this.render = () => {
            this.attach();
            onCleanup(() => this.detach());
            return (<div id="profiler" class="UILight" style={{
                    'font-size': 'small',
                    visibility: this.visibility() // [TODO] Resize, text wrapping
                }}>
          <Show when={this.visibility() === 'visible'}>
            <For each={profiles}>
              {([key, profile]) => (<div>{`${key}: ${profile()}`}</div>)}
            </For>
          </Show>
        </div>);
        };
        this.toggleKI = new KeyInput({ code: 'F12' });
        [this.visibility, this.setVisibility] =
            createSignal('hidden');
    }
    attach() {
        this.detach();
        window.addEventListener('keydown', this._toggle);
    }
    detach() {
        window.removeEventListener('keydown', this._toggle);
    }
}
//# sourceMappingURL=Profiler.jsx.map