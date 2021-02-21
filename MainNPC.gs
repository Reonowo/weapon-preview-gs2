function onActionGrab() {
  this.ap = player.ap;
  this.nick = player.nick;

  this.head = player.head;
  this.body = player.body;

  this.attr[1] = player.attr[1];

  this.shield = player.shield;
  this.colors = player.colors;
}

function clearOptions() {
  this.yOffset = 0;

  for (temp.npc : npcs) {
    if (npc.id in server.optionsList) {
      server.optionsList.remove(npc.id);
      npc.destroy();
    }
  }
}

function onActionResetToDefault() {
  clearOptions();

  this.ap = 100;
  this.nick = "GRAB ME";

  this.attr[1] = "no-hat.png";

  this.head = "head0.png";
  this.body = "body.png";

  this.shield = "no-shield.png";

  this.colors[0] = "orange";
  this.colors[1] = "white";
  this.colors[2] = "blue";
  this.colors[3] = "red";
  this.colors[4] = "black";

  this.dir = 2;

  this.ani = "idle";

  this.chat = "Nothing equipped!";
}

function onCreated() {
  this.currentOptions = {};

  showcharacter();
  onActionResetToDefault();
}

function onActionSetGani(gani) {
  this.ani = "";
  this.ani = gani;
}

function onActionSetGun(newGun) {
  this.chat = "Equipped:" SPC newGun @ "!";
}

function onActionTurnDummy(dir) {
  this.dir = dir;
}

public function setStartingGani(gani) {
  this.ani = gani;
}

//#CLIENTSIDE

public function resetToDefault() {
  triggeraction(this.x + 1, this.y + 1, "ResetToDefault", "");
}

public function turnDummy() {
  triggeraction(this.x+1, this.y+1, "TurnDummy", (this.dir + 1) % 4);
}

public function setGani(gani) {
  triggeraction(this.x+1, this.y+1, "SetGani", gani);
}
