<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Relations\Relation;

trait CascadeSoftDelete {

    /**
     * Boot the trait.
     *
     * Listen for the deleting event of a soft deleting model, and run
     * the delete operation for any configured relationship methods.
     *
     * @throws \LogicException
     */
    protected static function bootCascadeSoftDelete()
    {
        static::deleting(function ($model) {
//            $model->validateCascadeSoftDelete();
            $model->runCascadingDeletes();
        });
    }

    private function validateCascadeSoftDelete(){
        if ($invalidCascadingRelationships = $this->hasInvalidCascadingRelationships()) {
            $class = get_class($this);
            throw new Exception("Set relationships (".implode(', ',$invalidCascadingRelationships).") in $class don't implement soft delete");
        }
    }

    private function hasInvalidCascadingRelationships()
    {
        return array_filter($this->cascadeDeletes??[], function ($relationship) {
            return ! method_exists($this, $relationship)
                || ! $this->{$relationship}() instanceof Relation
                || ! is_null($this->{$relationship}) && ! method_exists($this->{$relationship}()->first(), 'runSoftDelete');
        });
    }

    protected function runCascadingDeletes()
    {
        foreach ($this->getActiveCascadingDeletes() as $relationship) {
            $this->cascadeSoftDeletes($relationship);
        }
    }

    /**
     * For the cascading deletes defined on the model, return only those that are not null.
     *
     * @return array
     */
    protected function getActiveCascadingDeletes(): array
    {
        return array_filter($this->cascadeDeletes??[], function ($relationship) {
            return ! is_null($this->{$relationship});
        });
    }

    /**
     * Cascade delete the given relationship on the given mode.
     *
     * @param string $relationship
     */
    protected function cascadeSoftDeletes(string $relationship)
    {
        $delete = $this->forceDeleting ? 'forceDelete' : 'delete';

        foreach ($this->{$relationship}()->get() as $model) {
            $model->{$delete}();
        }
    }

}
