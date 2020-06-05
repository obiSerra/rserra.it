import React, { useState } from "react";

import "./Poker.scss";

function calculatePotOdds(potSize, betSize, callSize) {
  if (!potSize || !betSize || !callSize) return " N/A";
  const [pot, bet, call] = [potSize, betSize, callSize].map(v =>
    parseInt(v, "10")
  );
  let percent = Math.round((call / (pot + bet + call)) * 10000) / 100;
  let odds = Math.round(((pot + bet) / call) * 10) / 10;
  if (Number.isNaN(odds) || Number.isNaN(percent)) odds = percent = "N/A";
  return (
    <div>
      <span className="result-value">
        {odds} : 1 ({percent}%)
      </span>
    </div>
  );
}

function advancedEv(potSize, cPerc, wPerc, wSize, lSize) {
  const fPerc = 100 - cPerc;
  const lPerc = 100 - wPerc;

  const fFac = fPerc / 100;
  const cFac = cPerc / 100;
  const wFac = wPerc / 100;
  const lFac = lPerc / 100;

  let ev = fFac * potSize + cFac * wFac * wSize - cFac * wFac * wSize * lSize;

  ev = Math.round(ev * 100) / 100;

  if (Number.isNaN(ev)) return "";
  const advFormula = `EV = F(pot) + C(W% * W$) - C(L% * L$)} | ${ev} = ${fFac} * ${potSize} + ${cFac} * (${wFac} * ${wSize}) - ${cFac} (${lFac} * ${lSize})`;
  const baseFormula = `EV = (W% * W$) - (L% * L$) | ${ev} = (${wFac} * ${wSize}) - (${lFac} * ${lSize})`;

  return (
    <div>
      EV: <span className="result-value">{ev}</span>
      <div className="result-formula">{!fPerc ? baseFormula : advFormula}</div>
    </div>
  );
}

function stackToPotRatio(potSize, shortStack) {
  if (!shortStack) return "";
  const spr = Math.round((shortStack / potSize) * 100) / 100;

  return (
    <div>
      Spr: <span className="result-value">{spr}</span>
    </div>
  );
}

const GroupElement = props => {
  return props.groups.filter(g => props.enabled.indexOf(g) >= 0).length ? (
    <div className={props.className || ""}>{props.children}</div>
  ) : (
    ""
  );
};

function isNumber(v) {
  return !Number.isNaN(+v);
}

function asNumber(v, d) {
  return isNumber(v) ? v : d;
}

function isEmpty(v) {
  return v === "" || v === null;
}

function emptyDefault(v, d) {
  return isEmpty(v) ? d : v;
}

const FormEntry = ({ formType, value, onChangeFn, groups, attrs }) => {
  return (
    <GroupElement
      className="form-group col-md-3"
      groups={groups}
      enabled={formType}
    >
      <label htmlFor={attrs.id}>{attrs.label}</label>
      <input
        type="text"
        className="form-control"
        id={attrs.id}
        aria-describedby={attrs.helpId}
        placeholder={attrs.placeholder}
        value={value}
        onChange={onChangeFn}
      />
      <small id={attrs.helpId} className="form-text text-muted">
        {attrs.helpContent}
      </small>
    </GroupElement>
  );
};

const Poker = () => {
  const initialFormData = {
    pot: "",
    bet: "",
    call: "",
    foldPerc: "",
    contPerc: "",
    winPerc: "",
    losePerc: "",
    winSize: "",
    loseSize: "",
    shortStack: ""
  };
  const all = ["base-ev", "adv-ev", "pot-odds", "spr"];
  const initialFormType = [...all];
  const [formData, setFormData] = useState(initialFormData);
  const [formType, setFormType] = useState(initialFormType);

  const toggleFormType = type => evt => {
    evt.target.checked
      ? setFormType(prev => [...prev, type])
      : setFormType(prev => prev.filter(t => t !== type));
  };

  const isTypeEnabled = type => formType.filter(t => t === type).length > 0;

  return (
    <div className="">
      <div className="text-center">
        <h1>Poker stuff</h1>
        <div className="m-3">Some Poker calculators</div>
      </div>

      <div className="calculator">
        <form>
          <div className="form-row d-flex flex-row-reverse">
            <div className="form-group">
              <div className="form-check">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={evt => {
                    setFormType(initialFormType);
                    setFormData(initialFormData);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={evt => {
                    setFormType([]);
                  }}
                >
                  None
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={evt => {
                    setFormType([...all]);
                  }}
                >
                  All
                </button>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="potOddsCheck"
                  checked={isTypeEnabled("pot-odds")}
                  onChange={toggleFormType("pot-odds")}
                />
                <label className="form-check-label" htmlFor="potOddsCheck">
                  Pot Odds
                </label>
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="baseEvCheck"
                  checked={isTypeEnabled("base-ev")}
                  onChange={toggleFormType("base-ev")}
                />
                <label className="form-check-label" htmlFor="baseEvCheck">
                  Basic Ev.
                </label>
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="advEvCheck"
                  checked={isTypeEnabled("adv-ev")}
                  onChange={toggleFormType("adv-ev")}
                />
                <label className="form-check-label" htmlFor="advEvCheck">
                  Advanced Ev.
                </label>
              </div>
            </div>
            <div className="form-group col-md-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sprCheck"
                  checked={isTypeEnabled("spr")}
                  onChange={toggleFormType("spr")}
                />
                <label className="form-check-label" htmlFor="sprCheck">
                  Stack To Pot Ratio
                </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <FormEntry
              formType={formType}
              value={formData.pot}
              onChangeFn={evt => {
                evt.persist();
                const val = evt.target.value;
                setFormData(prev => ({
                  ...prev,
                  pot: val
                }));
              }}
              groups={["pot-odds", "adv-ev", "spr"]}
              attrs={{
                id: "potSize",
                helpId: "potSizeHelp",
                placeholder: "Pot",
                helpContent: "The size of the Pot",
                label: "Pot Size"
              }}
            />
          </div>
          <div className="form-row">
            <FormEntry
              formType={formType}
              value={formData.bet}
              onChangeFn={evt => {
                evt.persist();
                const val = evt.target.value;
                setFormData(prev => ({
                  ...prev,
                  bet: val
                }));
              }}
              groups={["pot-odds"]}
              attrs={{
                id: "betSize",
                helpId: "betSizeHelp",
                placeholder: "Bet",
                helpContent: "The size of the bet",
                label: "Bet Size"
              }}
            />

            <FormEntry
              formType={formType}
              value={formData.call}
              onChangeFn={evt => {
                evt.persist();
                const val = evt.target.value;
                setFormData(prev => ({
                  ...prev,
                  call: val
                }));
              }}
              groups={["pot-odds"]}
              attrs={{
                id: "callSize",
                helpId: "callSizeHelp",
                placeholder: "Call",
                helpContent: "Call size",
                label: "To Call"
              }}
            />
          </div>
          <div className="form-row">
            <FormEntry
              formType={formType}
              value={formData.foldPerc}
              onChangeFn={evt => {
                evt.persist();
                let val = evt.target.value;
                val = Math.max(0, Math.min(val, 100));
                setFormData(prev => ({
                  ...prev,
                  foldPerc: val,
                  contPerc: 100 - val
                }));
              }}
              groups={["adv-ev"]}
              attrs={{
                id: "foldPerc",
                helpId: "foldPercHelp",
                placeholder: "Fold%",
                helpContent: "Estimation oppo folds % time",
                label: "Fold %"
              }}
            />

            <FormEntry
              formType={formType}
              value={formData.contPerc}
              onChangeFn={evt => {
                evt.persist();
                let val = evt.target.value;
                val = Math.max(0, Math.min(val, 100));
                setFormData(prev => ({
                  ...prev,
                  contPerc: val,
                  foldPerc: 100 - val
                }));
              }}
              groups={["adv-ev"]}
              attrs={{
                id: "contPerc",
                helpId: "contPercHelp",
                placeholder: "Cont%",
                helpContent:
                  "Estimation oppo continue (call/raise) % time (fold% + call% = 100)",
                label: "Continue %"
              }}
            />
          </div>
          <div className="form-row">
            <FormEntry
              formType={formType}
              value={formData.winPerc}
              onChangeFn={evt => {
                evt.persist();
                let val = asNumber(evt.target.value, 0);

                val = Math.max(0, Math.min(val, 100));
                setFormData(prev => ({
                  ...prev,
                  winPerc: val,
                  losePerc: 100 - val
                }));
              }}
              groups={["adv-ev", "base-ev"]}
              attrs={{
                id: "winPerc",
                helpId: "winPercHelp",
                placeholder: "Win%",
                helpContent: "Hero equity vs villan's continue range",
                label: "Win%"
              }}
            />
            <FormEntry
              formType={formType}
              value={formData.winSize}
              onChangeFn={evt => {
                evt.persist();
                let val = asNumber(evt.target.value, 0);
                setFormData(prev => ({
                  ...prev,
                  winSize: val
                }));
              }}
              groups={["adv-ev", "base-ev"]}
              attrs={{
                id: "winSize",
                helpId: "winSizeHelp",
                placeholder: "Win$",
                helpContent: "Win estimation",
                label: "Win$"
              }}
            />

            <FormEntry
              formType={formType}
              value={formData.losePerc}
              onChangeFn={evt => {
                evt.persist();
                let val = asNumber(evt.target.value, 0);
                val = Math.max(0, Math.min(val, 100));
                setFormData(prev => ({
                  ...prev,
                  losePerc: val,
                  winPerc: 100 - val
                }));
              }}
              groups={["adv-ev", "base-ev"]}
              attrs={{
                id: "losePerc",
                helpId: "losePercHelp",
                placeholder: "Lose%",
                helpContent: "Lose percentage",
                label: "Lose%"
              }}
            />
            <FormEntry
              formType={formType}
              value={formData.loseSize}
              onChangeFn={evt => {
                evt.persist();
                let val = asNumber(evt.target.value, 0);
                setFormData(prev => ({
                  ...prev,
                  loseSize: val
                }));
              }}
              groups={["adv-ev", "base-ev"]}
              attrs={{
                id: "loseSize",
                helpId: "loseSizeHelp",
                placeholder: "Lose$",
                helpContent: "Lose estimation",
                label: "Lose$"
              }}
            />
          </div>
          <div className="form-row">
            <FormEntry
              formType={formType}
              value={formData.shortStack}
              onChangeFn={evt => {
                evt.persist();
                let val = asNumber(evt.target.value, 0);
                setFormData(prev => ({
                  ...prev,
                  shortStack: val
                }));
              }}
              groups={["spr"]}
              attrs={{
                id: "shortStack",
                helpId: "shortStackHelp",
                placeholder: "Shorter Stack",
                helpContent: "Shorter Stack in play",
                label: "Shorter Stack"
              }}
            />
          </div>
        </form>
      </div>
      <div className="result-area">
        <GroupElement groups={["pot-odds"]} enabled={formType}>
          Pot Odds:{" "}
          {calculatePotOdds(
            emptyDefault(formData.pot, 0),
            emptyDefault(formData.bet, 0),
            emptyDefault(formData.call, 0)
          )}
        </GroupElement>

        <GroupElement groups={["adv-ev", "base-ev"]} enabled={formType}>
          {advancedEv(
            emptyDefault(formData.pot, 0),
            emptyDefault(formData.contPerc, 100),
            emptyDefault(formData.winPerc, 50),
            emptyDefault(formData.winSize, 0),
            emptyDefault(formData.loseSize, 0)
          )}
        </GroupElement>

        <GroupElement groups={["spr"]} enabled={formType}>
          {stackToPotRatio(
            emptyDefault(formData.pot, 0),
            emptyDefault(formData.shortStack, 0)
          )}
        </GroupElement>
      </div>
    </div>
  );
};

export default Poker;
